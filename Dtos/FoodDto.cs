using System;
using Chef.Domain.Entities;

namespace Chef.Dtos
{
    public record FoodDto(
        Guid Id,
        byte CategoryId,
        string Name,
        string Description,
        string ImageUrl,
        byte PreperationTime,
        int Price)
    {
    }
}

