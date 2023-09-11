using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record OrderItemRm(Guid OrderItemId, Guid FoodItemId, byte Amount, int Price);
}

