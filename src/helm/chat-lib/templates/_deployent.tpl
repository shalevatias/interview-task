{{- define "chat-lib.deployment" -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "chat-lib.general.name" . }}
  labels:
    app: {{ include "chat-lib.general.name" . }}
spec:
  replicas: {{ .Values.replicas }}
  selector:
    matchLabels:
      app: {{ include "chat-lib.general.name" . }}
  template:
    metadata:
      labels:
        app: {{ include "chat-lib.general.name" . }}
    spec:
      containers:
      - name: {{ include "chat-lib.general.name" . }}
        image: {{ include "chat-lib.general.image" . }}
        ports:
        - containerPort: {{ .Values.port }}
        envFrom: {{ include "chat-lib.general.envFrom" . | indent 8}}
        resources: {{ include "chat-lib.general.resources" . | indent 10 }}
{{- end }}