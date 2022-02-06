package service

import (
	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/repository"
)

type Status interface {
	GetStatuses() []entity.Status
}

type status struct {
	statusRepository repository.Status
}

func NewStatus() Status {
	return &status{
		statusRepository: repository.NewStatus(),
	}
}

func (s *status) GetStatuses() []entity.Status {
	var statuses []entity.Status
	s.statusRepository.GetAll(&statuses)

	return statuses
}
