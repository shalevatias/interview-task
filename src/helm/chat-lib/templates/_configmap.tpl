{{- define "chat-lib.configmap" -}}
{{- if .Values.configmap -}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "chat-lib.general.name" . }}
data: {{ toYaml .Values.configmap.data | nindent 2}}
{{- end -}}
{{- end -}}