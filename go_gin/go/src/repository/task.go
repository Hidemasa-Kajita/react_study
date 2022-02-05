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

type conn struct {
	connection *gorm.DB
}

func NewTask() Task {
	return &conn{
		connection: infrastructure.ConnDB(),
	}
}

func (db *conn) Save() {
	fmt.Printf("Save!")
}

func (db *conn) GetAll(ts *[]entity.Task) {
	db.connection.Find(&ts)
}

func (db *conn) GetOne(t *entity.Task, id string) {
	db.connection.Find(&t, id)
}

func (db *conn) Create(t *entity.Task) {
	db.connection.Create(&t)
}

func (db *conn) Update(t *entity.Task) {
	db.connection.Save(&t)
}

func (db *conn) Delete(t *entity.Task, id string) {
	db.connection.Delete(&t, id)
}
