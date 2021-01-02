# Docker Commands

## Build an iamge

Build an image based on the docker file in the directory.
Tag as [docker_login_name]/[image_name] .

```
dokcer build -t sithu83/posts .   # don't forgot '.'
```

## List all running containers

```
docker ps
```

## Execute the given command in a running container

```
docker exec -it [comtainer id] [cmd]
```

## Get logs

```
docker logs [container id]
```
