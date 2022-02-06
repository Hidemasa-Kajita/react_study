package request

type Task struct {
	Name string `json:"name" binding:"required,max=255,min=1"`
	// https://github.com/gin-gonic/gin/issues/1193
	// bag っぽいので、バリデーションは一旦スルーして、string で定義
	StartDate             *string `json:"start_date"`
	EndDate               *string `json:"end_date"`
	ImplementationHours   *int    `json:"implementation_hours"`
	ImplementationMinutes *int    `json:"implementation_minutes"`
	Status                Status  `json:"status" binding:"required"`
	Memo                  string  `json:"memo"`
}
