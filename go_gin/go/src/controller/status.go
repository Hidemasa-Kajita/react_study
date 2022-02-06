package controller

import (
	"net/http"

	"github.com/Hidemasa-Kajita/go_api_sample/response"
	"github.com/Hidemasa-Kajita/go_api_sample/service"
	"github.com/gin-gonic/gin"
)

type Status interface {
	Index(c *gin.Context)
}

type status struct {
	statusService  service.Status
	statusResponse response.Status
}

func NewStatus() Status {
	return &status{
		statusService:  service.NewStatus(),
		statusResponse: response.NewStatus(),
	}
}

func (tc *status) Index(c *gin.Context) {
	statuses := tc.statusService.GetStatuses()

	r := tc.statusResponse.FormatArray(statuses)

	c.JSON(http.StatusOK, r)
}
