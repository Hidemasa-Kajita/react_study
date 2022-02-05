package controller

import (
	"net/http"
	"strings"

	"github.com/Hidemasa-Kajita/go_api_sample/request"
	"github.com/Hidemasa-Kajita/go_api_sample/response"
	"github.com/Hidemasa-Kajita/go_api_sample/service"
	"github.com/gin-gonic/gin"
)

type Task interface {
	Index(c *gin.Context)
	Show(c *gin.Context)
	Store(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)
}

type task struct {
	taskService service.Task
}

func NewTask() Task {
	return &task{
		taskService: service.NewTask(),
	}
}

func (tc *task) Index(c *gin.Context) {
	tasks := tc.taskService.GetTasks()

	var tr response.Task
	r := tr.FormatArray(tasks)

	c.JSON(http.StatusOK, r)
}

func (tc *task) Show(c *gin.Context) {
	id := c.Param("id")
	task := tc.taskService.GetTask(id)

	if task.ID == 0 {
		r := response.BuildError(response.NotFound, nil)
		c.AbortWithStatusJSON(http.StatusOK, r)
		return
	}

	var tr response.Task
	r := tr.Format(task)

	c.JSON(http.StatusOK, r)
}

func (tc *task) Store(c *gin.Context) {
	var task request.Task

	err := c.ShouldBindJSON(&task)
	if err != nil {
		r := response.BuildError(response.BadRequest, err)
		c.AbortWithStatusJSON(http.StatusBadRequest, r)
		return
	}

	newTask := tc.taskService.CreateTask(task)

	c.JSON(http.StatusOK, newTask)
}

func (tc *task) Update(c *gin.Context) {
	id := c.Param("id")

	var inputTask request.Task
	err := c.ShouldBindJSON(&inputTask)

	if err != nil {
		r := response.BuildValidationError(strings.Split(err.Error(), "\n"))
		c.AbortWithStatusJSON(http.StatusBadRequest, r)
		return
	}

	task := tc.taskService.UpdateTask(inputTask, id)

	if task.ID == 0 {
		r := response.BuildError(response.BadRequest, nil)
		c.AbortWithStatusJSON(http.StatusBadRequest, r)
		return
	}

	c.JSON(http.StatusOK, task)
}

func (tc *task) Delete(c *gin.Context) {
	id := c.Param("id")

	tc.taskService.DeleteTask(id)

	c.JSON(http.StatusNoContent, nil)
}
