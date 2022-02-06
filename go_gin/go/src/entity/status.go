package entity

import (
	"time"
)

type Status struct {
	ID        uint64 `gorm:"primary_key:auto_increment"`
	Name      string `gorm:"type:varchar(255);not null"`
	Tasks     []Task
	CreatedAt time.Time `gorm:"type:timestamp;not null"`
	UpdatedAt time.Time `gorm:"type:timestamp;not null"`
}
