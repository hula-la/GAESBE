FROM openjdk:11-jdk-slim as builder

RUN apt-get update
RUN apt-get -y install libglib2.0-dev
RUN apt-get -y install libnss3

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
COPY chrome chrome
RUN chmod +x ./gradlew
RUN ./gradlew bootJar


FROM openjdk:11-jdk-slim
COPY --from=builder build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=gcp","/app.jar"]
EXPOSE 8081