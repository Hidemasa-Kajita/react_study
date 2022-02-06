package response

import (
	"github.com/Hidemasa-Kajita/go_api_sample/entity"
	"github.com/Hidemasa-Kajita/go_api_sample/infrastructure"
)

type status struct {
	ID        uint64 `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type Status interface {
	Format(et entity.Status) status
	FormatArray(statuss []entity.Status) []status
}

func NewStatus() Status {
	return &status{}
}

func (_ status) Format(et entity.Status) status {
	return status{
		ID:        et.ID,
		Name:      et.Name,
		CreatedAt: infrastructure.DateToString(et.CreatedAt, "2006-01-02 15:04:05"),
		UpdatedAt: infrastructure.DateToString(et.UpdatedAt, "2006-01-02 15:04:05"),
	}
}

func (t status) FormatArray(statuss []entity.Status) []status {
	r := make([]status, len(statuss), cap(statuss))
	for i, v := range statuss {
		r[i] = t.Format(v)
	}

	return r
}
