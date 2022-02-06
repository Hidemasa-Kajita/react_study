package response

import (
	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
)

type task struct {
	ID                    uint64  `json:"id"`
	Name                  string  `json:"name"`
	StartDate             *string `json:"start_date"`
	EndDate               *string `json:"end_date"`
	ImplementationHours   *int    `json:"implementation_hours"`
	ImplementationMinutes *int    `json:"implementation_minutes"`
	Status                string  `json:"status"`
	Memo                  string  `json:"memo"`
	CreatedAt             string  `json:"created_at"`
	UpdatedAt             string  `json:"updated_at"`
}

type Task interface {
	Format(et entity.Task) task
	FormatArray(tasks []entity.Task) []task
	FormatByStatus(status []entity.Status) map[string][]task
}

func NewTask() Task {
	return &task{}
}

func (_ task) Format(et entity.Task) task {
	return task{
		ID:                    et.ID,
		Name:                  et.Name,
		StartDate:             infrastructure.DateToStringWhenIncludeNil(et.StartDate, "2006-01-02"),
		EndDate:               infrastructure.DateToStringWhenIncludeNil(et.EndDate, "2006-01-02"),
		ImplementationHours:   et.ImplementationHours,
		ImplementationMinutes: et.ImplementationMinutes,
		Status:                et.Status.Name,
		Memo:                  et.Memo,
		CreatedAt:             infrastructure.DateToString(et.CreatedAt, "2006-01-02 15:04:05"),
		UpdatedAt:             infrastructure.DateToString(et.UpdatedAt, "2006-01-02 15:04:05"),
	}
}

func (t task) FormatArray(tasks []entity.Task) []task {
	r := make([]task, len(tasks), cap(tasks))
	for i, v := range tasks {
		r[i] = t.Format(v)
	}

	return r
}

func (t task) FormatByStatus(s []entity.Status) map[string][]task {
	r := make(map[string][]task, len(s))

	for _, v := range s {
		r[v.Name] = t.FormatArray(v.Tasks)
	}

	return r
}
