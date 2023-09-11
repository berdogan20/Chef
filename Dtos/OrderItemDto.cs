using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record OrderItemDto(Guid OrderItemId, Guid FoodItemId, byte Amount, int Price);
}

