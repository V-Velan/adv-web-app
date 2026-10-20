from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=20)
    date_of_birth: date


class UserOut(UserCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
