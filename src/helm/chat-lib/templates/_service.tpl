{{- define "chat-lib.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "chat-lib.general.name" . }}
spec:
  selector:
    app.kubernetes.io/name: {{ include "chat-lib.general.name" . }}
  ports:
    - protocol: TCP
      port: {{ .Values.port }}
      targetPort: {{ .Values.port }}
{{- end }}