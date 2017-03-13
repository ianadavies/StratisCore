﻿using Breeze.Api.Models;

namespace Breeze.Api.Wrappers
{
    /// <summary>
    /// An interface enabling wallet operations.
    /// </summary>
    public interface ISafeWrapper
    {
        string Create(string password, string folderPath, string name, string network);

        SafeModel Load(string password, string folderPath, string name);
    }
}