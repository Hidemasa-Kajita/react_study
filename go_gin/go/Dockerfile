FROM golang:1.16

COPY ./src /go/src

WORKDIR /go/src

RUN go mod download && \
    go get -u \
    github.com/gin-gonic/gin \
    github.com/cosmtrek/air \
    golang.org/x/tools/gopls \
    github.com/ramya-rao-a/go-outline \
    github.com/uudashr/gopkgs/v2/cmd/gopkgs \
    github.com/stamblerre/gocode \
    github.com/jinzhu/gorm \
    github.com/go-sql-driver/mysql \
    github.com/joho/godotenv \
    github.com/dgrijalva/jwt-go \
    github.com/mashingan/smapping

RUN go build

# CMD ["go", "run", "main.go"]
CMD ["air", "-c", ".air.toml"]
