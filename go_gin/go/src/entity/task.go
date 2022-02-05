package entity

import (
	"time"
)

type Label struct {
	ID   uint64
	Name string
}

type Task struct {
	ID                    uint64  `gorm:"primary_key:auto_increment" json:"id"`
	Name                  string  `gorm:"type:varchar(255);not null" json:"name"`
	StartDate             *string `gorm:"type:date" json:"start_date"`
	EndDate               *string `gorm:"type:date" json:"end_date"`
	ImplementationHours   *int    `gorm:"type:int" json:"implementation_hours"`
	ImplementationMinutes *int    `gorm:"type:int" json:"implementation_minutes"`
	Status                string  `gorm:"type:varchar(255);not null" json:"status"`
	Memo                  string  `gorm:"type:text" json:"memo"`
	Labels                []Label
	CreatedAt             time.Time  `gorm:"type:timestamp;not null" json:"created_at"`
	UpdatedAt             *time.Time `gorm:"type:timestamp" json:"updated_at"`
}
