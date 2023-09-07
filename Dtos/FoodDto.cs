using System;
namespace Chef.Dtos
{
	public record FoodDto(
		Guid Id,
		string Name,
		string Description,
		string ImageUrl,
		byte PreperationTime,
		int Price);
}

