using System;
namespace Chef.Dtos
{
	public record OrderDto(
		string OrderId,
		Guid FoodId,
		string OrderOwner,
        byte Amount,
        string Address,
		string Status);
}

