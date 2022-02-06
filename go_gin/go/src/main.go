package main

import (
	"io"
	"net/http"
	"os"
	"time"

	"github.com/Hidemasa-Kajita/go_api_sample/controller"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
	"github.com/Hidemasa-Kajita/go_api_sample/response"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// starting log.
	f, _ := os.Create("logs/" + time.Now().Format("2006-01-02") + ".log")
	gin.DefaultWriter = io.MultiWriter(os.Stdout, f)

	// env.
	gin.SetMode(os.Getenv("GIN_MODE"))

	// init.
	defer infrastructure.CloseDB()
	infrastructure.OpenDB()
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"http://localhost:3000",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"PUT",
			"GET",
			"OPTIONS",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))

	// register controllers.
	tc := controller.NewTask()
	sc := controller.NewStatus()

	// register routes.
	tr := r.Group("api/tasks")
	{
		tr.GET("/", tc.Index)
		tr.GET("/by-status", tc.ByStatus)
		tr.POST("/", tc.Store)
		tr.GET("/:id", tc.Show)
		tr.PUT("/:id", tc.Update)
		tr.DELETE("/:id", tc.Delete)
	}

	sr := r.Group("api/statuses")
	{
		sr.GET("/", sc.Index)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, response.Error{
			Message: "Not Found.",
		})
	})

	// start server.
	r.Run(":8080")
}
