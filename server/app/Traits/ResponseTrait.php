<?php

namespace App\Traits;

trait ResponseTrait
{
    public function successResponse($status ,$succes , $messege ,$data)
    {
        return response()->json([
            'status' => $status,
            'success' => $succes,
            'message' => $messege,
            'data' => $data
        ], $status);
    }
    private function errorResponse($status, $message, $errors)
    {
        return response()->json([
            'status' => $status,
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
