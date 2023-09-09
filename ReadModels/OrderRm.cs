using System;
namespace Chef.ReadModels
{
	public record OrderRm(
		string OrderId,
		Guid FoodId,
		string OrderOwner,
        byte Amount,
        string Address,
		string Status);
}

