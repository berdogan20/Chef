using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
	public record OrderItemRm(string OrderId, Guid OrderItemId, string FoodItemId, byte Amount, int Price);
}

