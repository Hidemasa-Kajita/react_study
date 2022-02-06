package infrastructure

import "time"

func StringToDateWhenIncludeNil(date *string, layout string) *time.Time {
	if date != nil {
		tmp, _ := time.Parse(layout, *date)
		return &tmp
	}

	return nil
}

func DateToStringWhenIncludeNil(date *time.Time, layout string) *string {
	if date != nil {
		tmp := date.Format(layout)
		return &tmp
	}

	return nil
}

func StringToDate(date string, layout string) time.Time {
	tmp, _ := time.Parse(layout, date)

	return tmp
}

func DateToString(date time.Time, layout string) string {
	return date.Format(layout)
}
