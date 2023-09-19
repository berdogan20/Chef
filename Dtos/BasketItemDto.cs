using System;
namespace Chef.Dtos
{
	public record BasketItemDto(Guid BasketItemId,
            string Email,
            string FoodId,
            byte Amount,
            int Price);
}

