FROM nginx:latest
# RUN rm /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
# COPY conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]