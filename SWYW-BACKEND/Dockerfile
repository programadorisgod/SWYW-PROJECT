ARG NODE_VERSION=22-alpine3.19-alpine
ARG DIR=/project
ARG PORT=3002
ARG ALPINE_VERSION=3.19

#################  stage 1 #################
#                                          #
#                 BASE                     #
#                                          #
# ##########################################

FROM node:${NODE_VERSION} AS base
ARG DIR
WORKDIR ${DIR}

COPY package*.json .

RUN npm i

#################  stage 2 #################
#                                          #
#                 BUILD                    #
#                                          #
# ##########################################

FROM base AS build
ARG DIR

COPY . .

RUN npm run build

RUN npm ci --omit=dev

#################  stage 3 #################
#                                          #
#                RELEASE                   #
#                                          #
# ##########################################

FROM alpine:${ALPINE_VERSION} AS release
ARG DIR
ARG PORT

WORKDIR ${DIR}

RUN apk add --no-cache libstdc++ dumb-init \
    && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
    && chown  node:node /project


COPY --from=base /usr/local/bin/node /usr/local/bin/node

USER node

COPY --from=build ${DIR}/node_modules ./node_modules

COPY --from=build ${DIR}/dist ./dist


ENV PORT=$PORT

ENTRYPOINT [ "dumb-init", "--" ]


CMD [ "node", "dist/index.js" ]
