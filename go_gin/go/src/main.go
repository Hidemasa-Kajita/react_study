package main

import (
	"io"
	"net/http"
	"os"
	"time"

	"github.com/Hidemasa-Kajita/go_api_sample/controller"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
	"github.com/Hidemasa-Kajita/go_api_sample/response"
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

	// register controllers.
	tc := controller.NewTask()

	// register routes.
	tr := r.Group("api/tasks")
	{
		tr.GET("/", tc.Index)
		tr.POST("/", tc.Store)
		tr.GET("/:id", tc.Show)
		tr.PUT("/:id", tc.Update)
		tr.DELETE("/:id", tc.Delete)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, response.Error{
			Message: "Not Found.",
		})
	})

	// start server.
	r.Run(":8080")
}
