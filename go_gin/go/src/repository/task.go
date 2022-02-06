package repository

import (
	"fmt"

	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
	"github.com/jinzhu/gorm"
)

type Task interface {
	Save()
	GetAll(ts *[]entity.Task)
	GetOne(t *entity.Task, id string)
	Create(t *entity.Task)
	Update(t *entity.Task)
	Delete(t *entity.Task, id string)
}

type taskConn struct {
	connection *gorm.DB
}

func NewTask() Task {
	return &taskConn{
		connection: infrastructure.ConnDB(),
	}
}

func (db *taskConn) Save() {
	fmt.Printf("Save!")
}

func (db *taskConn) GetAll(ts *[]entity.Task) {
	db.connection.Preload("Status").Find(&ts)
}

func (db *taskConn) GetOne(t *entity.Task, id string) {
	db.connection.Preload("Status").Find(&t, id)
}

func (db *taskConn) Create(t *entity.Task) {
	db.connection.Create(&t)
	db.connection.Preload("Status").Find(&t, t.ID)
}

func (db *taskConn) Update(t *entity.Task) {
	db.connection.Save(&t)
	db.connection.Preload("Status").Find(&t, t.ID)
}

func (db *taskConn) Delete(t *entity.Task, id string) {
	db.connection.Delete(&t, id)
}
