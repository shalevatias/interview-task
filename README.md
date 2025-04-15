# Interview Task - Elastic Stack with Filebeat on Kubernetes

Welcome to my project! This repository includes two main components: a Node.js chat application and a separate Elasticsearch stack for efficient log management and data visualization.

## Node Application
My Node.js chat application, built with Express, provides two key API endpoints:
- **/users**: Manages chat user operations such as creating new users or retrieving existing ones.
- **/messages**: Handles message exchanges between users, allowing you to send and retrieve chat messages.

For example, making a GET request to `http://localhost:3000/users/USERNAME` will return a JSON of specific user, and a request to `http://localhost:3000/messages/USERNAME` returns the chat messages of specific user.

## Elasticsearch Stack Overview
Our Elasticsearch stack is set up as a separate component, designed to support the overall system through log management and search functionalities:
- **StatefulSet (Elasticsearch):**  
  Deployed as a StatefulSet because Elasticsearch nodes require stable identities and persistent storage to ensure data durability.
- **Deployment (Kibana):**  
  Kibana is deployed as a Deployment since it is stateless, enabling easy scaling and rapid updates.
- **DaemonSet (Filebeat):**  
  Filebeat is run as a DaemonSet to guarantee that it collects logs from every node in the cluster efficiently.

## Filebeat and RBAC
Filebeat requires specific permissions to securely access logs from the nodes. To achieve this, we set up:
- **ServiceAccounts** to manage identities,
- **Roles and RoleBindings** to define and grant permissions within the namespace,
- **ClusterRoleBinding** to enable cluster-wide access when necessary.

## Quick Note
* Keep in mind that Kind does not assign external IP addresses, so we use port-forwarding to expose services outside the cluster.
* A `deployScript.sh` script is provided to deploy the entire system.

