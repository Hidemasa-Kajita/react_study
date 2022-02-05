package response

import "github.com/Hidemasa-Kajita/go_api_sample/entity"

type Task struct {
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

func (_ Task) Format(task entity.Task) Task {
	return Task{
		ID:                    task.ID,
		Name:                  task.Name,
		StartDate:             task.StartDate,
		EndDate:               task.EndDate,
		ImplementationHours:   task.ImplementationHours,
		ImplementationMinutes: task.ImplementationMinutes,
		Status:                task.Status,
		Memo:                  task.Memo,
		CreatedAt:             task.CreatedAt.Format("2006/01/02 15:04:05"),
		UpdatedAt:             task.UpdatedAt.Format("2006/01/02 15:04:05"),
	}
}

func (t Task) FormatArray(tasks []entity.Task) []Task {
	r := make([]Task, len(tasks), cap(tasks))
	for i, v := range tasks {
		r[i] = Task.Format(t, v)
	}

	return r
}
