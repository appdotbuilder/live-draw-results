<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDrawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'draw_category_id' => 'required|exists:draw_categories,id',
            'draw_number' => 'required|string|max:50|unique:draws,draw_number,' . $this->route('draw')->id,
            'draw_type' => 'required|string|max:50',
            'winning_numbers' => 'required|array|min:1',
            'winning_numbers.*' => 'integer|min:1|max:49',
            'special_numbers' => 'nullable|array',
            'special_numbers.*' => 'integer|min:1|max:49',
            'draw_date' => 'required|date',
            'status' => 'required|in:pending,live,completed,cancelled',
            'prize_pool' => 'nullable|numeric|min:0',
            'total_winners' => 'required|integer|min:0',
            'prize_breakdown' => 'nullable|array',
            'notes' => 'nullable|string',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'draw_category_id.required' => 'Please select a draw category.',
            'draw_category_id.exists' => 'The selected draw category is invalid.',
            'draw_number.required' => 'Draw number is required.',
            'draw_number.unique' => 'This draw number already exists.',
            'winning_numbers.required' => 'At least one winning number is required.',
            'winning_numbers.*.min' => 'Winning numbers must be between 1 and 49.',
            'winning_numbers.*.max' => 'Winning numbers must be between 1 and 49.',
            'draw_date.required' => 'Draw date is required.',
            'status.required' => 'Draw status is required.',
        ];
    }
}