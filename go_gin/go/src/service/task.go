package service

import (
	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
	"github.com/Hidemasa-Kajita/go_api_sample/repository"
	"github.com/Hidemasa-Kajita/go_api_sample/request"
)

type Task interface {
	GetTask(id string) entity.Task
	GetTasks() []entity.Task
	CreateTask(inputTask request.Task) entity.Task
	UpdateTask(inputTask request.Task, id string) entity.Task
	DeleteTask(id string)
	GetTasksByStatus() []entity.Status
}

type task struct {
	taskRepository   repository.Task
	statusRepository repository.Status
}

func NewTask() Task {
	return &task{
		taskRepository:   repository.NewTask(),
		statusRepository: repository.NewStatus(),
	}
}

func (s *task) GetTask(id string) entity.Task {
	var task entity.Task
	s.taskRepository.GetOne(&task, id)

	return task
}

func (s *task) GetTasks() []entity.Task {
	var tasks []entity.Task
	s.taskRepository.GetAll(&tasks)

	return tasks
}

func (s *task) GetTasksByStatus() []entity.Status {
	var status []entity.Status
	s.statusRepository.GetAllWithTasks(&status)

	return status
}

func (s *task) CreateTask(inputTask request.Task) entity.Task {

	task := entity.Task{
		Name:                  inputTask.Name,
		StartDate:             infrastructure.StringToDateWhenIncludeNil(inputTask.StartDate, "2006-01-02"),
		EndDate:               infrastructure.StringToDateWhenIncludeNil(inputTask.EndDate, "2006-01-02"),
		ImplementationHours:   inputTask.ImplementationHours,
		ImplementationMinutes: inputTask.ImplementationMinutes,
		StatusID:              inputTask.Status.ID,
		Memo:                  inputTask.Memo,
	}
	s.taskRepository.Create(&task)

	return task
}

func (s *task) UpdateTask(inputTask request.Task, id string) entity.Task {
	var task entity.Task
	var status entity.Status
	s.taskRepository.GetOne(&task, id)
	s.statusRepository.GetOne(&status, id)

	if task.ID == 0 {
		return task
	}

	task.Name = inputTask.Name
	task.StartDate = infrastructure.StringToDateWhenIncludeNil(inputTask.StartDate, "2006-01-02")
	task.EndDate = infrastructure.StringToDateWhenIncludeNil(inputTask.EndDate, "2006-01-02")
	task.ImplementationHours = inputTask.ImplementationHours
	task.ImplementationMinutes = inputTask.ImplementationMinutes
	task.StatusID = inputTask.Status.ID
	task.Memo = inputTask.Memo

	s.taskRepository.Update(&task)

	return task
}

func (s *task) DeleteTask(id string) {
	var task entity.Task

	s.taskRepository.Delete(&task, id)
}
