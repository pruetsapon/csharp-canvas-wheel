using System;
using System.Collections.Generic;

namespace random_item.Helpers
{
    public class Item
    {
        public string name;
        public string path;
        public int rate;
    }

    public class RandomItem
    {
        private static Random rnd = new Random();
        public static Item SelectItem(List<Item> items)
        {
            int poolSize = 0;
            for (int i = 0; i < items.Count; i++)
            {
                poolSize += items[i].rate;
            }

            int randomNumber = rnd.Next(0, poolSize) + 1;

            int accumulatedProbability = 0;
            for (int i = 0; i < items.Count; i++)
            {
                accumulatedProbability += items[i].rate;
                if (randomNumber <= accumulatedProbability)
                    return items[i];
            }
            return null;
        }
    }
}