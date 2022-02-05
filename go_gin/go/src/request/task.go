package request

type Task struct {
	Name                  string  `json:"name" binding:"required,max=255,min=1"`
	StartDate             *string `json:"start_date"`
	EndDate               *string `json:"end_date"`
	ImplementationHours   *int    `json:"implementation_hours"`
	ImplementationMinutes *int    `json:"implementation_minutes"`
	Status                string  `json:"status" binding:"required,max=255,min=1"`
	Memo                  string  `json:"memo"`
}
