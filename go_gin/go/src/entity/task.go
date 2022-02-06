package entity

import (
	"time"
)

type Label struct {
	ID   uint64
	Name string
}

type Task struct {
	ID                    uint64     `gorm:"primary_key:auto_increment"`
	Name                  string     `gorm:"type:varchar(255);not null"`
	StartDate             *time.Time `gorm:"type:date"`
	EndDate               *time.Time `gorm:"type:date"`
	ImplementationHours   *int       `gorm:"type:int"`
	ImplementationMinutes *int       `gorm:"type:int"`
	StatusID              uint64
	Status                Status `gorm:"type:not null" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Memo                  string `gorm:"type:text"`
	Labels                []Label
	CreatedAt             time.Time `gorm:"type:timestamp;not null"`
	UpdatedAt             time.Time `gorm:"type:timestamp;not null"`
}
