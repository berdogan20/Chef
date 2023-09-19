using System;
namespace Chef.Dtos
{
	public record BasketItemRm(Guid BasketItemId,
            string Email,
            string FoodId,
            byte Amount,
            int Price);
}

