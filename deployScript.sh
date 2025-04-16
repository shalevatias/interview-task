# Deploy the services to the Kubernetes cluster
echo "Deploying Elasticsearch"
kubectl apply -R -f monitoring/elasticsearch/
echo "Deploying Kibana"
kubectl apply -R -f monitoring/kibana/
echo "Deploying filebeat"
kubectl apply -R -f monitoring/filebeat/
echo "Deploying application"
kubectl apply -R -f src/k8s/

# Wait for the services to be up and running
sleep 5

# Forward Elasticsearch
echo "Port-forwarding Elasticsearch on http://localhost:9200"
kubectl port-forward svc/elasticsearch 9300:9200 &
ES_PID=$!

# Forward Kibana
echo "Port-forwarding Kibana on http://localhost:5601"
kubectl port-forward svc/kibana 5601:5601 &
KIBANA_PID=$!

# Forward application
echo "Port-forwarding Kibana on http://localhost:3000"
kubectl port-forward svc/chat-backend 3000:3000 &
APP_PID=$!

# Trap CTRL+C to clean up
trap "echo 'Stopping port-forwards...'; kill $ES_PID $KIBANA_PID $APP_PID; exit" SIGINT

# Wait to keep both running
wait