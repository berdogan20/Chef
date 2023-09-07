using System;
namespace Chef.ReadModels
{
	public record FoodRm(
		Guid Id,
		string Name,
		string Description,
		string ImageUrl,
		byte PreperationTime,
		int Price);
}

