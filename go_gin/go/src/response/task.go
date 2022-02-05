package response

import "github.com/Hidemasa-Kajita/go_api_sample/entity"

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
}

func NewTask() Task {
	return &task{}
}

func (_ task) Format(et entity.Task) task {
	return task{
		ID:                    et.ID,
		Name:                  et.Name,
		StartDate:             et.StartDate,
		EndDate:               et.EndDate,
		ImplementationHours:   et.ImplementationHours,
		ImplementationMinutes: et.ImplementationMinutes,
		Status:                et.Status,
		Memo:                  et.Memo,
		CreatedAt:             et.CreatedAt.Format("2006/01/02 15:04:05"),
		UpdatedAt:             et.UpdatedAt.Format("2006/01/02 15:04:05"),
	}
}

func (t task) FormatArray(tasks []entity.Task) []task {
	r := make([]task, len(tasks), cap(tasks))
	for i, v := range tasks {
		r[i] = task.Format(t, v)
	}

	return r
}
