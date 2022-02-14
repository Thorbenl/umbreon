PROJECT_ID=kapi-301915
ZONE=europe-west3-a
REGION=europe-west3

GITHUB_SHA?=latest
LOCAL_TAG=kiyomi-siyeon:$(GITHUB_SHA)
REMOTE_TAG=eu.gcr.io/$(PROJECT_ID)/$(LOCAL_TAG)

build:
	docker build -t $(LOCAL_TAG) .

push:
	docker tag $(LOCAL_TAG) $(REMOTE_TAG)
	docker push $(REMOTE_TAG)
