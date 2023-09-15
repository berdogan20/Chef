using System;
using System.ComponentModel.DataAnnotations;
using Chef.Domain.Entities;

namespace Chef.Dtos
{
	public record UserDto(
        [Required][EmailAddress][StringLength(100, MinimumLength = 3)] string Email,
        [Required][MinLength(2)][MaxLength(35)] string Password,
        [Required][MinLength(10)][MaxLength(200)] string Address);
}

