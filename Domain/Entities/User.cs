using System;
namespace Chef.Domain.Entities
{
	public record User(
        string Email,           // I will use email as user id
        string FirstName,
        string LastName,
        string password);
}

