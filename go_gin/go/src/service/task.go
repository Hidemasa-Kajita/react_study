package service

import (
	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/repository"
	"github.com/Hidemasa-Kajita/go_api_sample/request"
)

type Task interface {
	GetTask(id string) entity.Task
	GetTasks() []entity.Task
	CreateTask(inputTask request.Task) entity.Task
	UpdateTask(inputTask request.Task, id string) entity.Task
	DeleteTask(id string)
}

type task struct {
	taskRepository repository.Task
}

func NewTask() Task {
	return &task{
		taskRepository: repository.NewTask(),
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

func (s *task) CreateTask(inputTask request.Task) entity.Task {
	task := entity.Task{
		Name:                  inputTask.Name,
		StartDate:             inputTask.StartDate,
		EndDate:               inputTask.EndDate,
		ImplementationHours:   inputTask.ImplementationHours,
		ImplementationMinutes: inputTask.ImplementationMinutes,
		Status:                inputTask.Status,
		Memo:                  inputTask.Memo,
	}
	s.taskRepository.Create(&task)

	return task
}

func (s *task) UpdateTask(inputTask request.Task, id string) entity.Task {
	var task entity.Task
	s.taskRepository.GetOne(&task, id)

	if task.ID == 0 {
		return task
	}

	task.Name = inputTask.Name
	task.StartDate = inputTask.StartDate
	task.EndDate = inputTask.EndDate
	task.ImplementationHours = inputTask.ImplementationHours
	task.ImplementationMinutes = inputTask.ImplementationMinutes
	task.Status = inputTask.Status
	task.Memo = inputTask.Memo

	s.taskRepository.Update(&task)

	return task
}

func (s *task) DeleteTask(id string) {
	var task entity.Task

	s.taskRepository.Delete(&task, id)
}
