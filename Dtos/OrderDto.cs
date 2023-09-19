using System;
using Chef.Domain.Entities;
using Chef.ReadModels;

namespace Chef.Dtos
{
	public record OrderDto(

        Guid OrderId,
        DateTime OrderDate,
        string OrderOwner,
        string Address,
        byte StatusId,
        int TotalPayment);
}

