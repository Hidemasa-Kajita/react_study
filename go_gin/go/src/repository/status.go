package repository

import (
	"fmt"

	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
	"github.com/jinzhu/gorm"
)

type Status interface {
	Save()
	GetAll(ts *[]entity.Status)
	GetAllWithTasks(ts *[]entity.Status)
	GetOne(t *entity.Status, id string)
	Create(t *entity.Status)
	Update(t *entity.Status)
	Delete(t *entity.Status, id string)
}

type statusConn struct {
	connection *gorm.DB
}

func NewStatus() Status {
	return &statusConn{
		connection: infrastructure.ConnDB(),
	}
}

func (db *statusConn) Save() {
	fmt.Printf("Save!")
}

func (db *statusConn) GetAll(ts *[]entity.Status) {
	db.connection.Find(&ts)
}

func (db *statusConn) GetAllWithTasks(ts *[]entity.Status) {
	db.connection.Preload("Tasks").Preload("Tasks.Status").Find(&ts)
}

func (db *statusConn) GetOne(t *entity.Status, id string) {
	db.connection.Find(&t, id)
}

func (db *statusConn) Create(t *entity.Status) {
	db.connection.Create(&t)
}

func (db *statusConn) Update(t *entity.Status) {
	db.connection.Save(&t)
}

func (db *statusConn) Delete(t *entity.Status, id string) {
	db.connection.Delete(&t, id)
}
