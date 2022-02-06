package infrastructure

import (
	"fmt"
	"os"

	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

var connDB *gorm.DB

func OpenDB() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file.")
	}

	d := os.Getenv("DB_DRIVER")
	u := os.Getenv("DB_USER")
	p := os.Getenv("DB_PASS")
	h := os.Getenv("DB_HOST")
	n := os.Getenv("DB_NAME")

	t := "%s:%s@tcp(%s:3306)/%s?parseTime=true"
	dsn := fmt.Sprintf(t, u, p, h, n)
	db, err := gorm.Open(d, dsn)
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&entity.Task{}, &entity.Status{})
	connDB = db
}

func ConnDB() *gorm.DB {
	return connDB
}

func CloseDB() {
	dbSQL := connDB.DB()
	dbSQL.Close()
}
