using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record FoodRm(
		Guid Id,
        byte CategoryId,
        string Name,
		string Description,
		string ImageUrl,
		byte PreperationTime,
		int Price);
}

