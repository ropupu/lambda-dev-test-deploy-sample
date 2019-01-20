FROM amazonlinux:2017.09.0.20170930

RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -

RUN yum update -y
RUN yum install gcc44 gcc-c++ libgcc44 cmake xz wget curl -y \
  && yum clean all
RUN cd /tmp \
  && wget https://nodejs.org/dist/v8.10.0/node-v8.10.0-linux-x64.tar.xz \
  && ls \
  && tar Jxfv node-v8.10.0-linux-x64.tar.xz \
  && mv node-v8.10.0-linux-x64 /opt/

ENV PATH $PATH:/opt/node-v8.10.0-linux-x64/bin

# apex
RUN curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh

WORKDIR /var/lambda/

CMD ["node"]