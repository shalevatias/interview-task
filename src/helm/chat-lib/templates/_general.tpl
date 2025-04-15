{{- define "chat-lib.general.name" -}}
{{- toYaml .Chart.Name }}
{{- end }}

{{- define "chat-lib.general.envFrom" -}}
{{- with .Values.envFrom -}}
{{ range $resourceName, $_ := .configMaps }}
- configMapRef:
    name: {{ $resourceName }}
{{- end -}}
{{ range $resourceName, $_ := .secrets }}
- secretRef:
    name: {{ $resourceName }}
{{- end -}}
{{- end -}}
{{- end -}}


{{- define "chat-lib.general.resources" -}}
{{- $cpu := required "Missing resources.cpu property" (.Values.resources).cpu }}
{{- $memory := required "Missing resources.memory property" (.Values.resources).memory }}
{{- $unitRegex := "([a-z]|[A-Z]+$)" }}
{{- $floatRegex := "^[0-9]+(.[0-9]+)?" }}
{{- $cpuAmount := (regexFind $floatRegex ($cpu | toString)) | float64 }}
{{- $cpuUnit := regexFind $unitRegex ($cpu | toString) }}
requests:
    cpu: {{ (printf "%g%s" $cpuAmount $cpuUnit) | squote }}
    memory: {{ $memory | squote }}
limits: 
    cpu: {{ (printf "%g%s" (mulf $cpuAmount 4) $cpuUnit) | squote }}
    memory: {{ $memory | squote }}
{{- end -}}

{{- define "chat-lib.general.image" -}}
{{- $image_name := required "Missing image.name property" (.Values.image).name }}
{{- $image_tag := required "Missing image.tag property" (.Values.image).tag }}
{{- printf "%s:%s" $image_name $image_tag | quote }}
{{- end -}}
