#ErrImagePull, ErrImageNeverPull and ImagePullBackoff Errors
If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackOff errors after running kubectl apply, the simplest solution is to provide an imagePullPolicy to the pod.

First, run

```
kubectl delete -f infra/k8s/
```

Then, update your pod manifest:
'''
spec:
containers: - name: posts
image: cygnet/posts:0.0.1
imagePullPolicy: Never
'''
Then, run

```
kubectl apply -f infra/k8s/
```

This will ensure that Kubernetes will use the image built locally from your image cache instead of attempting to pull from a registry.

## cheat sheet

https://kubernetes.io/docs/reference/kubectl/cheatsheet/

## Load Balancer:

mandatory
https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml

## deploy

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.42.0/deploy/static/provider/cloud/deploy.yaml
```
