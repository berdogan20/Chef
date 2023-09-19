using System;
using Chef.Domain.Entities;

namespace Chef.ReadModels
{
    public record OrderRm(
        Guid OrderId,
        DateTime OrderDate,
        string OrderOwner,
        string Address,
        byte StatusId,
        int TotalPayment);
}

